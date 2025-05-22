const Section = ({ title, description, children }) => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-6 px-4 mx-auto max-w-screen-xl text-center lg:px-12">
                {title && (
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                        {/* {title} */}
                        A Comprehensive Tool for visually impaired
                    </h1>
                )}
                {description && (
                    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                        {/* {description} */}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid asperiores quisquam inventore magni?
                         Ex totam doloribus rem minus magni adipisci ipsum aspernatur architecto nesciunt, explicabo inventore 
                         repellat sint perspiciatis a ipsam repellendus!
                    </p>
                )}
                <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default Section;
