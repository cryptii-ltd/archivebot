export type SearchFilters = {
    contentQuery: string
    setContentQuery: React.Dispatch<React.SetStateAction<string>>
    authorQuery: string
    setAuthorQuery: React.Dispatch<React.SetStateAction<string>>
    toggleImages: boolean
    setToggleImages: React.Dispatch<React.SetStateAction<boolean>>
    toggleVideos: boolean
    setToggleVideos: React.Dispatch<React.SetStateAction<boolean>>
    toggleLinks: boolean
    setToggleLinks: React.Dispatch<React.SetStateAction<boolean>>
}
