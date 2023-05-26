import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { PDFViewer } from '@react-pdf/renderer';
import styled from 'styled-components';
import ClientForm from './ClientForm';
import StrategyContext from 'context/StrategyContext';
import { type StrategyContextType } from 'types';
import { StrategyPdf } from './StrategyPdf';
import { type IStrategy } from 'models/Strategy';

interface StrategiesGenaratorProps {
  show: boolean;
  handleClose: () => void;
}

const StyledModal = styled(Modal)`
  .modal-content {
    padding: 1rem 2rem;
  }
  .modal-body {
    padding: 1rem;
  }
  .modal-header {
    border-bottom: none;
  }
  .modal-footer {
    border-top: none;
  }
  .modal-title {
    font-family: $font-family-open;
    font-style: normal;
    font-weight: 700;
    font-size: 1rem;
    line-height: 11px;
    display: flex;
    align-items: center;
    color: var(--bs-modal-color);
  }
  .form-control-rak {
    width: 100%;
  }
`;

const StyledModalPDF = styled(Modal)`
  .modal-content {
    padding: 0;
  }
  .modal-body {
    padding: 0;
  }
  .modal-header {
    border-bottom: none;
  }
  .modal-title {
    font-family: $font-family-open;
    font-style: normal;
    font-weight: 700;
    font-size: 1rem;
    line-height: 11px;
    display: flex;
    align-items: center;
    color: var(--bs-modal-color);
  }
`;

const StrategiesGenerator: React.FC<StrategiesGenaratorProps> = ({
  show,
  handleClose,
}) => {
  const { strategyContext } = useContext<StrategyContextType>(StrategyContext);
  const { selectedStrategies } = strategyContext;
  const [pdfData, setPdfData] = useState<IStrategy[]>([]);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  const generatePdf = (): void => {
    const listStrategy: IStrategy[] = strategyContext.data.filter((item) =>
      selectedStrategies.includes(item.id),
    );
    setPdfData(listStrategy);
    setIsGenerated(true);
  };

  const handleCloseModal = (): void => {
    handleClose();
    setIsGenerated(false);
  };

  return (
    <>
      {!isGenerated ? (
        <>
          <StyledModal
            show={show}
            onHide={handleCloseModal}
            backdrop="static"
            keyboard={false}
            size={'md'}
          >
            <Modal.Header closeButton>
              <Modal.Title>Information à renseigner pour envoi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ClientForm />
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn-rak-primary" onClick={generatePdf}>
                Générer un PDF
              </Button>
            </Modal.Footer>
          </StyledModal>
        </>
      ) : (
        <>
          <StyledModalPDF
            className="custom"
            show={show}
            onHide={handleCloseModal}
            backdrop="static"
            keyboard={false}
            fullscreen
          >
            <Modal.Header closeButton> </Modal.Header>
            <Modal.Body>
              <PDFViewer width={'100%'} height={'100%'}>
                <StrategyPdf data={pdfData} />
              </PDFViewer>
            </Modal.Body>
          </StyledModalPDF>
        </>
      )}
    </>
  );
};

export default StrategiesGenerator;
