const NewsPage = () => {
    const newsArticles = [
        { title: 'Headline 1', summary: 'Summary 1' },
        { title: 'Headline 2', summary: 'Summary 2' },
        // Add more articles as needed
    ];

    return (
        <div>
            {newsArticles.map((article, index) => (
                <div key={index}>
                    <h2>{article.title}</h2>
                    <p>{article.summary}</p>
                </div>
            ))}
        </div>
    );
};

export default NewsPage;
