import React, { useState, useEffect } from "react";
import browserAPI from "./BrowserApi/CacheAccessor";

function NewBookmark(props) {
  const MAX_NUM_BOOKMARKS = 5;
  let [linkHref, setLinkHref] = useState(null);
  let [linkName, setLinkName] = useState("");
  const setActivePageInfo = (info) => {
    setLinkHref(info.linkHref);
    setLinkName(info.linkName);
  };

  const linkAlreadyExists = (savedLinks, currentLink) => {
    const filteredLinks = savedLinks.filter(
      (savedLink) => savedLink.linkHref === currentLink
    );
    return filteredLinks.length > 0;
  };

  let isDisabled =
    linkAlreadyExists(props.savedLinks, linkHref) ||
    props.savedLinks.length >= MAX_NUM_BOOKMARKS ||
    linkName === null ||
    linkName.trim() === "";

  useEffect(() => browserAPI.getActivePageInfo(setActivePageInfo), [linkHref]);

  const saveBookmark = () => {
    let folderName = "folder";
    browserAPI.addNewBookmark(
      folderName,
      { linkHref, linkName },
      props.setSavedLinks
    );
  };

  const handleLinkNameChange = (e) => {
    setLinkName(e.currentTarget.value);
  };

  return (
    <div className="flex justify-between space-x-2 m-2">
      <div className="w-full">
        <label for="email" class="sr-only">
          Email
        </label>
        <input
          type="text"
          id="linkLabel"
          name="linkLabel"
          value={linkName}
          onChange={handleLinkNameChange}
          class="mr-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="Link label"
        />
      </div>
      <button
        type="button"
        className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        disabled:opacity-25"
        disabled={isDisabled}
        onClick={saveBookmark}
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

export default NewBookmark;
