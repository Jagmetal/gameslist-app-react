import { useRef, useState } from "react";

export default function GamesFilter({ genres, publishers, onFilterChange }) {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [publisher, setPublisher] = useState("");
    const titleRef = useRef();
    const genreRef = useRef();
    const publisherRef = useRef();

    function handleTitleSearch(e) {
        const titleText = e.target.value;
        setTitle(titleText);
        applyFilters();
    }

    function handlePublisherChange(e) {
        const selectedPublisher = e.target.value;
        setPublisher(selectedPublisher);
        applyFilters();
    }

    function handleGenreChange(e) {
        const genreText = e.target.value;
        setGenre(genreText);
        applyFilters();
    }


    function applyFilters() {
        onFilterChange(titleRef.current.value, genreRef.current.value, publisherRef.current.value);

    }


    function resetFilterControls() {
        setTitle("");
        setGenre("");
        setPublisher("");
        titleRef.current.value = "";
        genreRef.current.value = "";
        publisherRef.current.value = "";
    }

    function removeFilters() {
        resetFilterControls();
        applyFilters();
    }

    let genresOptionJsx = genres.map(genre => {
        return (
            <option value={genre}>{genre}</option>
        )
    });
    genresOptionJsx.unshift(<option value="">All</option>)

    let publishersOptionJsx = publishers.map(publisher => {
        return (
            <option value={publisher}>{publisher}</option>
        )
    });

    publishersOptionJsx.unshift(<option value="">All Publishers</option>)

    return (
        <>
            <div>
                <input type="text" ref={titleRef}
                    className="games-search-box"
                    value={title}
                    onChange={(e) => { handleTitleSearch(e) }}
                    placeholder="Enter a title">
                </input>
                <button onClick={() => { removeFilters() }}>Remove Filters</button>
            </div>
            <div>
                Filters:
                <select ref={genreRef}
                    onChange={(e) => { handleGenreChange(e) }}
                >
                    {genresOptionJsx}
                </select>
            </div>
            <div>
                <select ref={publisherRef} onChange={handlePublisherChange}>
                    {publishersOptionJsx}
                </select>
            </div>
        </>
    );
}

