import "./view.css";
import Sidebar from "../../components/sidebar/sidebar";
import Message from "../../components/message/message";
import JumpTo from "../../components/jumpTo/jumpTo";

import { MessageResponse, MessageData } from "../../types/messageData";
import { SearchFilters } from "../../types/searchFilters";

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * View Component - Renders the Sidebar and Messages based on message data.
 * @returns {JSX.Element} View component.
 */
export default function View(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const messageData: MessageResponse = location.state;
  const renderLimit: number = 25;

  // Search parameters
  const [contentQuery, setContentQuery] = useState("");
  const [authorQuery, setAuthorQuery] = useState("");
  const [toggleImages, setToggleImages] = useState<boolean>(false);
  const [toggleVideos, setToggleVideos] = useState<boolean>(false);
  const [toggleLinks, setToggleLinks] = useState<boolean>(false);

  const pageTop = useRef(null);
  const pageBottom = useRef(null);

  /**
   * useEffect hook to control component behavior on location changes.
   * - Redirects to the root URL if messageData is not present in location.state.
   * - Sets the 'loaded' state to true when location.state is available, indicating the component is ready to render.
   * @param {Object} location - The current location object provided by react-router-dom.
   */
  useEffect(() => {
    if (!messageData) navigate("/");
    if (!location.state) return;
    setLoaded(true);
  }, [messageData, location, navigate]);

  // Filter based on content and author search
  const filteredMessages = () => {
    return messageData.messages
      .filter((message: MessageData) =>
        message.content.toLowerCase().includes(contentQuery.toLowerCase())
      )
      .filter((message: MessageData) =>
        message.author.toLowerCase().includes(authorQuery.toLowerCase())
      )
      .slice(renderLimit * -1) // Temporary - render the last n amount of messages
      .map((message: MessageData) => {
        const imageAttachments = ["image", "tenor"];
        const videoAttachments = ["video", "youtube"];
        const urlExpression =
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
        const urlMatcher = new RegExp(urlExpression);
        if (toggleImages) {
          if (message.attachments.length > 0) {
            if (
              message.attachments.some((attachment: any) =>
                imageAttachments.includes(attachment.type)
              )
            ) {
              return <Message key={message.id} {...message} />;
            }
          }
        } else if (toggleVideos) {
          if (message.attachments.length > 0) {
            message.attachments.forEach((attachment: any) => {
              if (videoAttachments.includes(attachment.type))
                return <Message key={message.id} {...message} />;
            });
          }
        } else if (toggleLinks) {
          if (
            message.content.match(urlMatcher) &&
            !(message.attachments.length > 0)
          ) {
            console.log(message.content);
            return <Message key={message.id} {...message} />;
          }
        } else {
          return <Message key={message.id} {...message} />;
        }
      });
  };

  const filters: SearchFilters = {
    contentQuery: contentQuery,
    setContentQuery: setContentQuery,
    authorQuery: authorQuery,
    setAuthorQuery: setAuthorQuery,
    toggleImages: toggleImages,
    setToggleImages: setToggleImages,
    toggleVideos: toggleVideos,
    setToggleVideos: setToggleVideos,
    toggleLinks: toggleLinks,
    setToggleLinks: setToggleLinks,
  };

  return (
    <div className="view">
      {loaded && (
        <>
          <Sidebar
            searchFilter={filters}
            guildName={messageData.guild_name}
            channelName={messageData.channel_name}
          />
          <div className="messages">
            <span className="jump-anchor" ref={pageTop}></span>

            {filteredMessages()}

            <span className="jump-anchor" ref={pageBottom}></span>
          </div>

          {/* Jump to bottom/top button */}
          <JumpTo upRef={pageTop} downRef={pageBottom} />
        </>
      )}
    </div>
  );
}
