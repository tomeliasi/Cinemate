import { useState, useEffect } from "react";
import {
  InstagramLogo,
  facebookLogo,
  twitterLogo,
  IMDBLogo,
} from "../SocialLogos";
import { getExternalIDS } from "../../../../services/MultiService";
import "./ExternalSocials.css";

const ExternalSocials = (props) => {
  const [externalIDS, setExternalIDS] = useState(null);

  useEffect(() => {
    const fetchExternalIDS = async () => {
      const iDS = await getExternalIDS(props.ID,props.elementType);
      setExternalIDS(iDS);
    };

    fetchExternalIDS();
  }, [props.ID]);

  return (
    <div className="social-icons">
      {externalIDS && externalIDS.facebook_id && (
        <a
          href={`https://www.facebook.com/${externalIDS.facebook_id}`}
          target="_blank"
        >
          <img
            className="social-img"
            src={facebookLogo}
            // onClick={() => console.log(externalIDS.facebook_id)}
          />
        </a>
      )}
      {externalIDS && externalIDS.instagram_id && (
        <a
          href={`https://www.instagram.com/${externalIDS.instagram_id}`}
          target="_blank"
        >
          <img
            className="social-img"
            src={InstagramLogo}
            // onClick={() => console.log(externalIDS.instagram_id)}
          />
        </a>
      )}
      {externalIDS && externalIDS.twitter_id && (
        <a
          href={`https://twitter.com/${externalIDS.twitter_id}`}
          target="_blank"
        >
          <img
            className="social-img"
            src={twitterLogo}
            // onClick={() => console.log(externalIDS.twitter_id)}
          />
        </a>
      )}
      {externalIDS && externalIDS.imdb_id && (
        <a
          href={`https://www.imdb.com/title/${externalIDS.imdb_id}`}
          target="_blank"
        >
          <img
            className="social-img"
            src={IMDBLogo}
            // onClick={() => console.log(externalIDS.imdb_id)}
          />
        </a>
      )}
    </div>
  );
};

export { ExternalSocials };
