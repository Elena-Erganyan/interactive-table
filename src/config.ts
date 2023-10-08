export const tableData = {
  title: 'Строительно-монтажные работы',
  headProperties: [
    'Уровень', 'Наименование работ', 'Основная з/п',
    'Оборудование', 'Накладные расходы', 'Сметная прибыль',
  ],
  properties: ['rowName', 'salary', 'equipmentCosts', 'overheads', 'estimatedProfit'],
  props: {
    rowName: {
      display: 'Наименование работ',
      type: 'string',
    },
    salary: {
      display: 'Основная з/п',
      type: 'number',
    },
    equipmentCosts: {
      display: 'Оборудование',
      type: 'number',
    },
    overheads: {
      display: 'Накладные расходы',
      type: 'number',
    },
    estimatedProfit: {
      display: 'Сметная прибыль',
      type: 'number',
    },
  }
};
