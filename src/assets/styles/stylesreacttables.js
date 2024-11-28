const customStylesTables = {
  headCells: {
    style: {
      backgroundColor: '#3b82f6', 
      color: 'white',
      fontSize: '12px',
      textTransform: 'capitalize',
    },
  },
  cells: {
    style: {
      padding: '6px', // Padding sel tabel
      fontSize: '12px',
      color: '#333',
      textAlign: 'center'
    },
  },
  rows: {
    style: {
      '&:not(:last-of-type)': {
        borderBottom: '1px solid #e5e7eb', // Border bawah antar baris
      },
    },
  },
};

export default customStylesTables;