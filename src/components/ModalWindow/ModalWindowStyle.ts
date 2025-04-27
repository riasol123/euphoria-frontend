export const modalWindowStyles = {
  modalBox: {
    borderRadius: '20px',
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  },
  modalTitle: {
    variant: 'h6',
    component: 'h2',
    textAlign: 'center',
    marginTop: '15px',
    fontSize: '30px',
  },

  modalDescription: {
    mt: 2,
  },
};
