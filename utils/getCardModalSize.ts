const getCardModalSize = ({
  isFormModal,
  isTablet,
  isDesktop,
}: {
  isFormModal: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}) => {
  let modalWidth;
  let modalHeight;

  if (isFormModal) {
    modalWidth = '327px';
    modalHeight = '869px';

    if (isTablet || isDesktop) {
      modalWidth = '506px';
      modalHeight = '907px';
    }
  } else {
    modalWidth = '327px';
    modalHeight = '708px';

    if (isTablet) {
      modalWidth = '680px';
      modalHeight = '770px';
    }
    if (isDesktop) {
      modalWidth = '730px';
      modalHeight = '763px';
    }
  }
  return { modalWidth, modalHeight };
};

export default getCardModalSize;
