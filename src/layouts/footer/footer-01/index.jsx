import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import LogoWidget from "./../../../components/widgets/logo-widget";
// import NewsletterWidget from "@widgets/newsletter-widget";
// import QuicklinkWidget from "@widgets/quicklink-widget";
// import InformationWidget from "@widgets/information-widget";
// import SoldOutWidget from "@widgets/sold-out-widget";
// import FooterLinkWidget from "@widgets/footer-link-widget";
// import SocialWidget from "@widgets/social-widget";
import { ItemType } from "./../../../utils/types";

// Demo data
import footerData from "../../../data/general/footer-01.json";
import contactData from "../../../data/general/contact.json";

const Footer = ({ space, className, data }) => (
  <>
    <div
      className={clsx(
        "rn-footer-one bg-color--1",
        space === 1 && "rn-section-gap mt--100 mt_md--80 mt_sm--80",
        space === 2 && "rn-section-gap",
        space === 3 && "mt--100 mt_md--80 mt_sm--80",
        className
      )}
    ></div>
    <div className="copy-right-one ptb--20 bg-color--1">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="copyright-left">
              <span>{footerData.copyright_text}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

Footer.propTypes = {
  space: PropTypes.oneOf([1, 2, 3]),
  className: PropTypes.string,
  data: PropTypes.shape({
    items: PropTypes.arrayOf(ItemType),
  }),
};

Footer.defaultProps = {
  space: 1,
};

export default Footer;
