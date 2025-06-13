
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-gray-900">
            In<span className="text-blue-600">flow</span>encer.ai
          </Link>
        </div>

        {/* Privacy Policy Card */}
        <Card className="shadow-lg border-0 rounded-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Privacy Policy
            </CardTitle>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Effective Date:</strong> 13th June 2025</p>
              <p><strong>Last Updated:</strong> 13th June 2025</p>
            </div>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                InflowencerBrain ("we", "our", or "us") provides a platform to help businesses manage the end-to-end workflow of influencer marketing, including campaign creation, outreach, negotiations, contracts, payments, and reporting.
              </p>
              
              <p>
                This Privacy Policy explains how we collect, use, and protect your information when you use our platform, including when you connect your Google account.
              </p>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">1. Information We Collect</h2>
                <p>When you use our platform, we may collect the following information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Email address</li>
                  <li>Username</li>
                  <li>Google profile information (name, email) if you log in using Google OAuth</li>
                  <li>Google Drive file metadata (name, ID, modified date of documents you select)</li>
                  <li>Google Docs content (read-only access to a selected document for campaign setup)</li>
                  <li>Campaign and influencer-related data manually entered by you</li>
                  <li>Business name, email address, and reviews submitted through the waitlist form</li>
                </ul>
                <p className="font-medium">We do not request or access your files without your explicit selection.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">2. How We Use Your Information</h2>
                <p>We use your data to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Authenticate your login (via email/password or Google)</li>
                  <li>Let you select an existing Google Doc to prefill campaign details</li>
                  <li>Manage and display your campaigns and influencer lists</li>
                  <li>Communicate important updates or changes</li>
                </ul>
                <p className="font-medium">We do not use your data for advertising or share it with third parties for marketing purposes.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">3. Google OAuth and API Access</h2>
                <p>We use Google OAuth 2.0 to enable Google login and allow read-only access to documents and drive file metadata that you explicitly select.</p>
                <p>The scopes we request include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 font-mono text-sm">
                  <li>https://www.googleapis.com/auth/userinfo.email</li>
                  <li>https://www.googleapis.com/auth/documents.readonly</li>
                  <li>https://www.googleapis.com/auth/drive.metadata.readonly</li>
                </ul>
                <p className="font-medium">We do not request edit or delete permissions.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">4. Data Storage and Security</h2>
                <p>Your data is stored securely in our database with encryption where applicable. We do not store your Google password or any sensitive OAuth credentials beyond what's required for access tokens.</p>
                <p>Access tokens are stored securely and are used only to perform the functions you authorized.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">5. Data Sharing</h2>
                <p>We do not share your data with third parties unless:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Required by law</li>
                  <li>Necessary to protect our rights</li>
                  <li>You explicitly authorize it</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">6. User Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Request access to or deletion of your data</li>
                  <li>Disconnect your Google account at any time</li>
                  <li>Contact us for any privacy concerns</li>
                </ul>
                <p>To do so, please email us at <a href="mailto:prajwal.katakam@gmail.com" className="text-blue-600 hover:text-blue-500">prajwal.katakam@gmail.com</a>.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">7. Contact Us</h2>
                <p>If you have any questions about this policy, please contact:</p>
                <p>📧 <a href="mailto:prajwal.katakam@gmail.com" className="text-blue-600 hover:text-blue-500">prajwal.katakam@gmail.com</a></p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">8. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. The latest version will always be available at this page.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back Navigation */}
        <div className="text-center mt-8 space-x-4">
          <Link 
            to="/login" 
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back to Login
          </Link>
          <span className="text-gray-300">|</span>
          <Link 
            to="/" 
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
