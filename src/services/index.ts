import { type IFilters } from 'models/Filters';

const strategies = {
  data: [
    {
      id: 1,
      point: {
        name: 'SAULIEU',
        type: 'AIRLINE',
        pointType: 'STATION',
        substation: 100,
      },
      parameters: {
        distance: {
          minValue: 11.2,
          maxValue: 12.9,
        },
        cost: {
          minValue: 100,
          maxValue: 200,
        },
        delay: {
          minValue: 23,
          maxValue: 34,
        },
      },
      indicators: {
        available: 34,
        isSufficient: true,
        isStation: true,
      },
      connectionMessage: 'ANTENNA',
      polylineCoords: [
        [
          [48.86634, 2.331447],
          [48.92185595946764, 2.2523177752585997],
        ],
      ],
      pointCoords: {
        label: 'Colombe',
        lat: 48.92185595946764,
        lng: 2.2523177752585997,
      },
    },
    {
      id: 2,
      point: {
        name: 'SAULIEU',
        type: 'AIRLINE',
        pointType: 'LINE',
        substation: 6300,
      },
      parameters: {
        distance: {
          minValue: 11.2,
          maxValue: 12.9,
        },
        cost: {
          minValue: 100,
          maxValue: 200,
        },
        delay: {
          minValue: 23,
          maxValue: 34,
        },
      },
      indicators: {
        available: 34,
        isSufficient: true,
        isStation: true,
      },
      connectionMessage: 'ANTENNA',
      polylineCoords: [
        [
          [48.86634, 2.331447],
          [48.91125195499602, 2.3886169038945457],
          [48.955908911731406, 2.3103393186829693],
        ],
      ],
      pointCoords: {
        label: 'Épinay-sur-Seine',
        lat: 48.955908911731406,
        lng: 2.3103393186829693,
      },
    },
    {
      id: 3,
      point: {
        name: 'SAULIEU',
        type: 'AIRLINE',
        pointType: 'STATION',
        substation: 8000,
      },
      parameters: {
        distance: {
          minValue: 11.2,
          maxValue: 12.9,
        },
        cost: {
          minValue: 100,
          maxValue: 200,
        },
        delay: {
          minValue: 23,
          maxValue: 34,
        },
      },
      indicators: {
        available: 34,
        isSufficient: true,
        isStation: true,
      },
      connectionMessage: 'ANTENNA',
      polylineCoords: [
        [
          [48.86634, 2.331447],
          [48.88665102521443, 2.5022567315481927],
        ],
      ],
      pointCoords: {
        label: 'Villemombe',
        lat: 48.88665102521443,
        lng: 2.5022567315481927,
      },
    },
    {
      id: 4,
      point: {
        name: 'SAULIEU',
        type: 'AIRLINE',
        pointType: 'STATION',
        substation: 15100,
      },
      parameters: {
        distance: {
          minValue: 11.2,
          maxValue: 12.9,
        },
        cost: {
          minValue: 100,
          maxValue: 200,
        },
        delay: {
          minValue: 23,
          maxValue: 34,
        },
      },
      indicators: {
        available: 34,
        isSufficient: true,
        isStation: true,
      },
      connectionMessage: 'ANTENNA',
      polylineCoords: [
        [
          [48.86634, 2.331447],
          [48.74965804806524, 2.345014915640729],
        ],
      ],
      pointCoords: {
        label: 'Rungis',
        lat: 48.74965804806524,
        lng: 2.345014915640729,
      },
    },
    {
      id: 5,
      point: {
        name: 'SAULIEU',
        type: 'AIRLINE',
        pointType: 'STATION',
        substation: 22000,
      },
      parameters: {
        distance: {
          minValue: 11.2,
          maxValue: 12.9,
        },
        cost: {
          minValue: 100,
          maxValue: 200,
        },
        delay: {
          minValue: 23,
          maxValue: 34,
        },
      },
      indicators: {
        available: 34,
        isSufficient: true,
        isStation: true,
      },
      connectionMessage: 'ANTENNA',
      polylineCoords: [
        [
          [48.86634, 2.331447],
          [48.9245256146872, 2.4426799669460113],
          [48.97187518121856, 2.3915248783647622],
        ],
      ],
      pointCoords: {
        label: 'Garges-lès-Gonesse',
        lat: 48.97187518121856,
        lng: 2.3915248783647622,
      },
    },
    {
      id: 6,
      point: {
        name: 'SAULIEU',
        type: 'AIRLINE',
        pointType: 'STATION',
        substation: 200,
      },
      parameters: {
        distance: {
          minValue: 11.2,
          maxValue: 12.9,
        },
        cost: {
          minValue: 100,
          maxValue: 200,
        },
        delay: {
          minValue: 23,
          maxValue: 34,
        },
      },
      indicators: {
        available: 34,
        isSufficient: true,
        isStation: true,
      },
      connectionMessage: 'ANTENNA',
      polylineCoords: [
        [
          [48.86634, 2.331447],
          [48.83980296322342, 2.228530042611377],
        ],
      ],
      pointCoords: {
        label: 'Boulogne-Billancourt',
        lat: 48.83980296322342,
        lng: 2.228530042611377,
      },
    },
    {
      id: 7,
      point: {
        name: 'SAULIEU',
        type: 'AIRLINE',
        pointType: 'STATION',
        substation: 7000,
      },
      parameters: {
        distance: {
          minValue: 11.2,
          maxValue: 12.9,
        },
        cost: {
          minValue: 100,
          maxValue: 200,
        },
        delay: {
          minValue: 23,
          maxValue: 34,
        },
      },
      indicators: {
        available: 34,
        isSufficient: true,
        isStation: true,
      },
      connectionMessage: 'ANTENNA',
      polylineCoords: [
        [
          [48.86634, 2.331447],
          [48.84793699106692, 2.443793401943211],
        ],
      ],
      pointCoords: {
        label: 'Vincennes',
        lat: 48.84793699106692,
        lng: 2.443793401943211,
      },
    },
  ],
};
// This function is temporary, to simulate that the backend may take eome time to respond
const wait = async (ms: number): Promise<number> => {
  return await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const getStrategies = async (): Promise<any> => {
  await wait(500);
  // return await axios.get<IStrategy[]>(`${BACK_SERVER_SIMULATOR_URL}strategies`);
  return await Promise.resolve(strategies);
};

export const postStrategies = async (filters: IFilters): Promise<number> => {
  // return await axios.post(`${BACK_SERVER_SIMULATOR_URL}filters`, filters);
  return await wait(500);
};
