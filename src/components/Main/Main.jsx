const Main = ({ children }) => {
    return (
        <main className="bg-white dark:bg-gray-900" style={{ minHeight: 'calc(100vh - 145px)' }}>
            {children}
        </main>
    );
};

export default Main;
