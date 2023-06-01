/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { type FiltersContextType } from 'types';
import FiltersContext from 'context/FiltersContext';
import { type Coordinates } from 'models/Coordinates';
import { Icon } from 'components/shared/Icon';
import { API_ADDRESS_URL } from 'utils/constants';
import ClickOutside from './ClickOutside';

const StyledDiv = styled.div`
  width: 100%;
  position: relative;
  display: inline-block;
  .search-input {
    width: 100%;
    padding: 11px;
    font-size: 13px;
    color: var(--rak-palette-textSearch);
    &.invalid {
      border: 1px solid var(--rak-palette-bd_red);
    }
  }
  .search-icon {
    position: absolute;
    top: 21px;
    right: 23px;
    cursor: pointer;
  }
  .autocomplete-items {
    position: absolute;
    border: 1px solid #d4d4d4;
    background: #fff;
    border-bottom: none;
    border-top: none;
    padding-left: 0;
    z-index: 9999;
    top: 100%;
    left: 0;
    right: 0;

    li {
      list-style: none;
      padding-left: 0;
      a {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 15px;
        color: var(--rak-palette-textSearch);
        cursor: pointer;
        display: block;
        padding: 0.625rem 0.3125rem 0.625rem 1.25rem;

        &:hover {
          background: rgba(115, 171, 255, 0.2);
        }
      }
    }
  }

  .search-input {
    width: 100%;
    padding-left: 0.75rem;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 0.8125rem;
    line-height: 0.6875rem;
    color: var(--rak-palette-textSearch);
  }
`;

const AutocompleteInput: React.FC = () => {
  const refInput = useRef<HTMLInputElement>(null);

  const defaultPlaceholder = 'Rechercher une adresse';
  const [addresses, setAddresses] = useState<Coordinates[]>([]);
  const [address, setAddress] = useState<string>('');
  const [resetInput, setResetInput] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const { filtersContext, setFiltersContext } =
    useContext<FiltersContextType>(FiltersContext);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const isValidAddress = (address: string): boolean => {
    // Regex pattern for a French address: [Number] [Street Name], [Optional Complement], [Postal Code] [City]
    const regex =
      /^[0-9]{1,3}\s[A-Za-zÀ-ÖØ-öø-ÿ\s]{1,100},?\s?[0-9]{5}\s[A-Za-zÀ-ÖØ-öø-ÿ\s]{1,100}$/;
    return regex.test(address);
  };

  const onChangeAddress = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const term = event.target.value;
    setAddress(term);

    if (term.length > 5) {
      getListAddressByTerm(term);
    } else if (term.length === 0) {
      setRestMap();
    }
  };

  const handleSelected = (address: Coordinates): void => {
    setFiltersContext({
      ...filtersContext,
      coordinates: address,
    });
    setShowElement(false);

    setAddress(address.label);
  };

  const getListAddressByTerm = (term: string): void => {
    fetch(
      `${API_ADDRESS_URL}?q=${term.trim()}&type=housenumber&autocomplete=5&limit=5`,
    )
      .then(async (response) => await response.json())
      .then((data) => {
        const results: Coordinates[] = data.features.map((feature: any) => {
          return {
            label: feature.properties.label,
            lng: feature.geometry.coordinates[0],
            lat: feature.geometry.coordinates[1],
          };
        });
        setShowElement(true);
        setResetInput(true);
        setAddresses(results);
        return results;
      })
      .catch((error) => {
        console.log(error);
        setIsValid(true);
      });
  };

  const getAddressByEnter = (term: string): void => {
    fetch(
      `${API_ADDRESS_URL}?q=${term.trim()}&type=housenumber&autocomplete=5&limit=1`,
    )
      .then(async (response) => await response.json())
      .then((result) => {
        const feature = result.features[0];
        const currentAddress = {
          label: feature.properties.label,
          lng: feature.geometry.coordinates[0],
          lat: feature.geometry.coordinates[1],
        };

        handleSelected(currentAddress);
        return currentAddress;
      })
      .catch((error) => {
        console.log(error);
        setIsValid(true);
      });
  };

  const onClickAddress = (): void => {
    if (address.length > 0 && address.length > 5 && isValidAddress(address)) {
      setAddress(address.trim());
      getListAddressByTerm(address.trim());
    } else if (address.length === 0) {
      setRestMap();
    }
  };

  const onChangeSearch = (): void => {
    if (address.length === 0) {
      setRestMap();
    }
    setShowElement(true);
  };

  const setRestMap = (): void => {
    setAddresses([]);
    setFiltersContext({
      ...filtersContext,
      coordinates: { label: '', lng: 0, lat: 0 },
    });
    setAddress('');
    setResetInput(false);
  };

  const onResetSearch = (): void => {
    setRestMap();
  };

  // Show/Hide list to Click Outside Element
  const [showElement, setShowElement] = useState(true);
  const handleClickOutside = (): void => {
    setShowElement(false);
  };

  useEffect(() => {
    if (address.length === 0) {
      setRestMap();
    }
  }, [address]);

  // key Press handler function
  const handlekeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === 'Enter' &&
      address.length > 5 &&
      isValidAddress(address)
    ) {
      getAddressByEnter(address);
    }
  };

  // navigate list with keyboard
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex <= 0 ? addresses.length - 1 : prevIndex - 1,
        );
        break;
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex === addresses.length - 1 ? 0 : prevIndex + 1,
        );
        break;
      case 'Enter':
        if (selectedIndex !== -1) {
          event.preventDefault();
          handleSelected(addresses[selectedIndex]);
          setSelectedIndex(-1);
        }
        break;
      case 'Escape':
        setAddress('');
        setSelectedIndex(-1);
        break;
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSelectedIndex(-1);
    }, 100);
  };

  return (
    <StyledDiv className="autocomplete">
      <InputGroup className={`input-group padding-10`}>
        <Form.Control
          placeholder={address.length > 0 ? address : defaultPlaceholder}
          className={`search-input search text-truncate ${
            isValid ? 'invalid' : 'valid'
          }`}
          bsPrefix="form-control-rak"
          ref={refInput}
          onInput={onChangeAddress}
          onKeyPress={handlekeyPress}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onClick={onChangeSearch}
          value={address}
        />
        <>
          {isValid ? (
            <Form.Text className="text-muted error_message">
              {` L'adresse saisie ne correspond pas`}
            </Form.Text>
          ) : null}
        </>
      </InputGroup>
      {resetInput ? (
        <Icon
          iconName="XLg"
          color="black"
          className="search-icon"
          onClick={onResetSearch}
        />
      ) : (
        <Icon
          iconName="Search"
          color="black"
          className="search-icon"
          onClick={onClickAddress}
        />
      )}

      {addresses.length > 0 && showElement && (
        <ClickOutside onClickOutside={handleClickOutside}>
          <ul className="autocomplete-items">
            {addresses.map((address, index) => (
              <li key={index}>
                <a
                  onClick={() => {
                    handleSelected(address);
                  }}
                  onMouseEnter={() => {
                    setSelectedIndex(index);
                  }}
                  style={
                    index === selectedIndex
                      ? { backgroundColor: 'rgba(115, 171, 255, 0.2)' }
                      : {}
                  }
                >
                  {address.label}
                </a>
              </li>
            ))}
          </ul>
        </ClickOutside>
      )}
    </StyledDiv>
  );
};
export default AutocompleteInput;
