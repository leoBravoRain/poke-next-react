const MainLayout = ({children}) => {
  return (
    <>
      <div>Nav bar</div>
      <main>{children}</main>
      <div>footer</div>
    </>
  );
};

export default MainLayout;
