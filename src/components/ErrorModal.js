import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ErrorContext, errorState } from './GlobalContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ErrorModal() {
  const { ErrorState, setErrorState } = React.useContext(ErrorContext);
  const handleClose = () => setErrorState(errorState.noErrors);
  return (
    <div>
      <Modal
        open={ErrorState.showErrorModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            К моему сожалению что-то пошло не так.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Постараюсь исправить это в ближайшее время. Если вы хотите сообщить
            что-то дополнительное, можно&nbsp;
            <a href="mailto:yawm@devyatkin.dev?subject=Ваша кривуля не работает!">
              написать на почту
            </a>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
