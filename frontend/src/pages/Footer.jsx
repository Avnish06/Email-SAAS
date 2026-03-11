import { useNavigate } from "react-router-dom";
const brandLogo = "/Modern tech logo on blue background.png";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer-container-refined">
      <div className="footer-divider-refined"></div>
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand-refined">
            <div className="logo-container" onClick={() => navigate("/")}>
              <img
                src={brandLogo}
                alt="Colvo"
                className="h-12 w-12 object-cover rounded-full shadow-md transition-all hover:scale-105"
              />
            </div>
            <p className="brand-desc">
              The ultimate email marketing engine for modern businesses.
              Build, automate, and grow with precision using Colvo.
            </p>
            <div className="social-links">
              <SocialBtn icon="ri:facebook-fill" href="https://www.facebook.com/reel/936798708699430/?app=fbl" />
              <SocialBtn icon="ri:instagram-fill" href="https://www.instagram.com/hatbaliya?igsh=MXZ5Z203YXdqeWJhMQ==" />
              <SocialBtn icon="ri:youtube-fill" href="https://youtube.com/@hatbaliya?si=iZpFuImYSmA3Vcoz" />
              <SocialBtn icon="ri:linkedin-fill" href="https://www.linkedin.com/in/hatbaliya?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" />
            </div>
          </div>

          {/* Platform Links */}
          <div className="footer-col">
            <h3>Platform</h3>
            <ul>
              <FooterLink label="Dashboard"    onClick={() => navigate("/dashboard")} />
              <FooterLink label="Campaigns"    onClick={() => navigate("/campaigns")} />
              <FooterLink label="Analytics"    onClick={() => navigate("/analytics")} />
              <FooterLink label="Contacts"     onClick={() => navigate("/contacts")} />
              <FooterLink label="Support"      onClick={() => navigate("/support")} />
              <FooterLink label="Integrations" onClick={() => navigate("/support")} />
            </ul>
          </div>

          {/* Resources Links */}
          <div className="footer-col">
            <h3>Resources</h3>
            <ul>
              <FooterLink label="Templates"     onClick={() => navigate("/campaign/templates")} />
              <FooterLink label="Documentation" onClick={() => navigate("/support")} />
              <FooterLink label="API Reference" onClick={() => navigate("/support")} />
              <FooterLink label="Blog"          onClick={() => navigate("/support")} />
              <FooterLink label="System Status" onClick={() => navigate("/support")} />
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col spacer-col">
            <h3>Stay Updated</h3>
            <p className="newsletter-desc">
              Get the latest Colvo news and updates directly in your inbox.
            </p>
            <div className="newsletter-group-refined">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input-refined"
              />
              <div className="newsletter-btn-refined">Subscribe</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright">
            © 2026 Colvo Technology. Crafted with precision for the modern web.
          </p>
          <div className="legal-links">
            <span onClick={() => navigate("/support")} style={{ cursor: "pointer" }}>Terms of Service</span>
            <span onClick={() => navigate("/support")} style={{ cursor: "pointer" }}>Privacy Policy</span>
            <span onClick={() => navigate("/support")} style={{ cursor: "pointer" }}>Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Reusable clickable footer link */
const FooterLink = ({ label, onClick }) => (
  <li onClick={onClick} style={{ cursor: "pointer" }}>
    {label}
  </li>
);

const SocialBtn = ({ icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="social-btn"
  >
    <iconify-icon icon={icon} style={{ fontSize: "20px", color: "currentColor" }}></iconify-icon>
  </a>
);
