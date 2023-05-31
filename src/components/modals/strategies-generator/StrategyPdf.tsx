import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import { type IStrategy } from 'models/Strategy';

import {
  ConnectionMessageTypeLabels,
  StationTypeLabels,
  StrategyTypeLabels,
} from 'enums';

interface PDFProps {
  data: IStrategy[];
}

// Register font
Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf',
});

Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v35/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1y4nY1M2xLER.ttf',
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'Inter',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  logo: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
  },
  flex: {
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 25,
    height: 25,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    fontFamily: 'Open Sans',
  },
  separator: {
    display: 'flex',
    width: 1,
    height: 15,
    backgroundColor: '#009CDF',
    marginLeft: 5,
    marginRight: 5,
  },
  date: {
    fontSize: 10,
    marginBottom: 30,
    textAlign: 'right',
  },
  table: {
    display: 'flex',
    width: 'auto',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: 1,
    borderColor: '#dadada',
    marginBottom: 10,
  },
  tableCell: {
    fontSize: 11,
    padding: 5,
    width: '100%',
  },
  tableHeader: {
    fontSize: 11,
    fontWeight: 700,
    padding: 5,
    color: '#009CDF',
    width: '100%',
  },
  description: {
    width: '30%',
  },
  details: {
    width: '70%',
  },
  parameters: {
    width: '100%',
    background: 'rgba(0,156,223,.1)',
    borderRadius: '0.3125rem',
    padding: '5px',
    flexDirection: 'row',
    fontSize: 10,
  },
  parameterItem: {
    width: '40%',
  },
  textBold: {
    fontWeight: 700,
  },
});

export const StrategyPdf: React.FC<PDFProps> = (data) => {
  console.log('data: ', data);

  const getCurrentDate = (): string => {
    const separator = '/';
    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${date}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.logo}>
            <View style={styles.flex}>
              <Image
                src={`data:image/png;base64,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`}
                style={styles.image}
              />
              <Text style={styles.separator}></Text>
              <Text style={styles.title}>RAKOTO</Text>
            </View>
          </View>
          <Text style={styles.date}>{getCurrentDate()}</Text>
          <View style={styles.table}>
            {/* Render table rows */}
            {data.data.map((row, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.description}>
                  <Text style={styles.tableHeader} break>
                    STRATÉGIE ({row.id})
                  </Text>
                  <Text style={styles.tableCell} break>
                    {
                      StrategyTypeLabels[
                        row.point.pointType as keyof typeof StrategyTypeLabels
                      ]
                    }{' '}
                    {row.point.name} (
                    {
                      StationTypeLabels[
                        row.point.type as keyof typeof StationTypeLabels
                      ]
                    }
                    )
                  </Text>
                  <Text style={styles.tableCell} break>
                    {row.point.name} {`(${row.point.substation / 1000}KV / LS)`}
                  </Text>
                  <Text style={styles.tableCell} break>
                    Raccordement en{' '}
                    {
                      ConnectionMessageTypeLabels[
                        row.connectionMessage as keyof typeof ConnectionMessageTypeLabels
                      ]
                    }
                  </Text>
                </View>

                {/* details */}
                <View style={styles.details}>
                  <View style={styles.parameters}>
                    <View style={styles.parameterItem}>
                      <Text style={styles.tableCell}>Distance (km) :</Text>
                      <Text style={styles.tableCell}>
                        <Text style={styles.textBold}>
                          {row.parameters.distance.minValue}
                        </Text>{' '}
                        {'Réelle'} -{' '}
                        <Text style={styles.textBold}>
                          {row.parameters.distance.maxValue}
                        </Text>{' '}
                        {'Majorée'}
                      </Text>
                    </View>
                    <View style={styles.parameterItem}>
                      <Text style={styles.tableCell}>Coût min (k€) :</Text>
                      <Text style={styles.tableCell}>
                        <Text style={styles.textBold}>
                          {row.parameters.cost.minValue}
                        </Text>{' '}
                        {'Min'} -{' '}
                        <Text style={styles.textBold}>
                          {row.parameters.cost.maxValue}
                        </Text>{' '}
                        {'Max'}
                      </Text>
                    </View>
                    <View style={styles.parameterItem}>
                      <Text style={styles.tableCell}>Délais (mois) :</Text>
                      <Text style={styles.tableCell}>
                        <Text style={styles.textBold}>
                          {row.parameters.delay.minValue}
                        </Text>{' '}
                        {'Min'} -{' '}
                        <Text style={styles.textBold}>
                          {row.parameters.delay.maxValue}
                        </Text>{' '}
                        {'Max'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.parameters}>
                    <Text style={styles.tableCell}>
                      {`Capacité réservé restante `}{' '}
                      <Text style={styles.textBold}>
                        {row.indicators.available}
                      </Text>{' '}
                      - {`CR `}
                      <Text style={styles.textBold}>
                        {row.indicators.isSufficient !== null
                          ? 'Suffisant'
                          : 'Insuffisant'}{' '}
                        - {`Poste en projet `}
                      </Text>
                      <Text style={styles.textBold}>
                        {row.indicators.isStation !== null ? 'OUI' : 'NON'}
                      </Text>
                    </Text>
                  </View>
                </View>
                {/* Add more cells for each column */}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};
