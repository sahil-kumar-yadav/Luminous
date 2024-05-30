const Card = ({ href, icon, title }) => {
    return (
        <a
            aria-label="button"
            // onMouseOver={() => speakElementDescription(this)}
            className="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-700 divide-gray-200 dark:divide-gray-700 shadow-md flex max-w-sm flex-col hover:bg-gray-100 dark:hover:bg-gray-700 p-4 sm:p-6 items-center text-center"
            href={href}
        >
            <i className={`icon-${icon} mb-2 text-gray-500 dark:text-gray-400 text-4xl`}></i>
            <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                {title}
            </h5>
        </a>
    );
};

export default Card;
