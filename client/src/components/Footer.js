import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        <div>
          <Link to="/" className="text-xl font-bold">
  RentEase
</Link>
          <p className="text-gray-400">
            Affordable rentals for modern urban living.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <Link to="/about">About</Link>
          <br></br>
          <Link to="/careers">Careers</Link>
          <br></br>
          <Link to="/blog">Blog</Link>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <Link to="/help">Help Center</Link>
          <br></br>
          <Link to="/terms">Terms</Link>
          <br></br>
          <Link to="/privacy">Privacy</Link>
          <br></br>
        </div>

      </div>

      <div className="text-center text-gray-500 mt-10">
        © 2026 RentEase. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

