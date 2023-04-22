export function getIdByEpisodeId(episodeId) {
    const mapping = {
        1: 4,
        2: 5,
        3: 6,
        4: 1,
        5: 2,
        6: 3,
    }

    return mapping[episodeId];
}