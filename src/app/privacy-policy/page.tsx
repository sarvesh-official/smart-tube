export default function PrivacyPolicy() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="h-full w-full max-w-4xl p-8 text-white overflow-y-auto custom-scrollbar">
        <div className="space-y-8">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="mb-4">
              Smart Tube is a distraction-free YouTube playlist viewer that helps users focus on their saved content. 
              This privacy policy explains how we collect, use, and protect your data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Collection and Usage</h2>
            <h3 className="text-xl font-semibold mb-2">We collect:</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Your Google account email (for authentication)</li>
              <li>Access to your YouTube playlists and playlist items</li>
              <li>Basic profile information (name, profile picture)</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2">How we use your data:</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>To authenticate you with Google</li>
              <li>To display your YouTube playlists and saved videos</li>
              <li>To provide search functionality within your playlists</li>
              <li>To customize your viewing experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">YouTube API Services</h2>
            <p className="mb-4">
              Smart Tube uses YouTube API Services to access your playlist data. By using our application, you are also bound by{' '}
              <a 
                href="https://www.youtube.com/t/terms" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                {`YouTube's Terms of Service`}
              </a>.
            </p>
            <p className="mb-4">
              You can review and revoke access to your data through your{' '}
              <a 
                href="https://security.google.com/settings/security/permissions" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Google Security Settings
              </a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
            <p className="mb-4">
              We take the protection of your data seriously:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>{`We only store essential data needed for the app's functionality`}</li>
              <li>We use secure authentication methods through Google OAuth</li>
              <li>We do not share your data with third parties</li>
              <li>We do not use your data for advertising purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">User Rights</h2>
            <p className="mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Access your personal data</li>
              <li>Request deletion of your data</li>
              <li>Revoke access to your YouTube account</li>
              <li>Request information about how your data is used</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="mb-4">
              If you have any questions about this privacy policy or your data, please contact us at:{' '}
              <a href="mailto:your-email@example.com" className="text-blue-400 hover:text-blue-300">
                your-email@example.com
              </a>
            </p>
          </section>

          <footer className="text-sm text-gray-400 pb-8">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </footer>
        </div>
      </div>
    </div>
  );
}