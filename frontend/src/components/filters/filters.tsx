import "./filters.css";
import Setting from "../setting/setting";
import React from "react";

// TODO: Simplify - we already have a SearchFilter type that can be used here.
interface FiltersProps {
  searchAuthor: string;
  setSearchAuthor: React.Dispatch<React.SetStateAction<string>>;
  imageToggle: boolean;
  setImageToggle: React.Dispatch<React.SetStateAction<boolean>>;
  videoToggle: boolean;
  setVideoToggle: React.Dispatch<React.SetStateAction<boolean>>;
  linkToggle: boolean;
  setLinkToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Filters Component - Displays input field and settings for message filters.
 * @params {FiltersProps} props
 * @returns {JSX.Element} Filters component.
 */
export default function Filters(props: FiltersProps): JSX.Element {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => props.setSearchAuthor(e.target.value)}
        value={props.searchAuthor}
      />
      <Setting
        name={"Images"}
        isToggled={props.imageToggle}
        onToggle={() => props.setImageToggle(!props.imageToggle)}
      />
      <Setting
        name={"Videos"}
        isToggled={props.videoToggle}
        onToggle={() => props.setVideoToggle(!props.videoToggle)}
      />
      <Setting
        name={"Links"}
        isToggled={props.linkToggle}
        onToggle={() => props.setLinkToggle(!props.linkToggle)}
      />
    </div>
  );
}
