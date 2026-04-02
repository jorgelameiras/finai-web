import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#E4E1E9] py-16 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/landing" className="text-[#C5A059] hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-headline font-light mb-4">Privacy Policy</h1>
          <p className="text-[#D1C5B4] text-sm">
            Last Updated: March 26, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-[#D1C5B4] leading-relaxed">
          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to FinAI ("we," "our," or "us"). We are committed to protecting your privacy 
              and ensuring the security of your financial data. This Privacy Policy explains how we 
              collect, use, disclose, and safeguard your information when you use our financial 
              management application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              2. Information We Collect
            </h2>
            <h3 className="text-xl font-medium text-white mt-4 mb-2">2.1 Account Information</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Email address</li>
              <li>Password (encrypted)</li>
              <li>Account preferences and settings</li>
            </ul>

            <h3 className="text-xl font-medium text-white mt-4 mb-2">2.2 Financial Data</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Bank account information (read-only access via Plaid)</li>
              <li>Transaction history</li>
              <li>Account balances</li>
              <li>Spending categorizations</li>
            </ul>

            <h3 className="text-xl font-medium text-white mt-4 mb-2">2.3 Usage Data</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>AI chat interactions</li>
              <li>Dashboard customizations</li>
              <li>Feature usage analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              3. How We Use Your Information
            </h2>
            <p className="mb-3">We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide and maintain the FinAI service</li>
              <li>Process transactions and display financial insights</li>
              <li>Personalize your experience with AI-powered recommendations</li>
              <li>Communicate important updates and security alerts</li>
              <li>Improve our services and develop new features</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              4. Data Security
            </h2>
            <p className="mb-3">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>256-bit AES encryption</strong> for data at rest</li>
              <li><strong>TLS 1.3</strong> for data in transit</li>
              <li><strong>OAuth 2.0</strong> for secure authentication</li>
              <li><strong>Read-only bank access</strong> via Plaid (we cannot move your money)</li>
              <li><strong>Regular security audits</strong> and penetration testing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              5. Data Sharing and Third Parties
            </h2>
            <p className="mb-3">We share your data only in the following circumstances:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Plaid:</strong> For secure bank connection (read-only access)
              </li>
              <li>
                <strong>AI Providers:</strong> OpenAI, Anthropic, or your own OpenClaw instance 
                (only when you explicitly configure them; we do not store your API keys)
              </li>
              <li>
                <strong>Payment Processors:</strong> Stripe for subscription billing
              </li>
              <li>
                <strong>Legal Obligations:</strong> When required by law or to protect our rights
              </li>
            </ul>
            <p className="mt-3">
              <strong>We never sell your data.</strong> Your financial information is yours alone.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              6. Your Rights
            </h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Access:</strong> Request a copy of your data</li>
              <li><strong>Correction:</strong> Update inaccurate information</li>
              <li><strong>Deletion:</strong> Request permanent deletion of your account and data</li>
              <li><strong>Export:</strong> Download your financial data in a portable format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing emails</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, contact us at{' '}
              <a href="mailto:privacy@finai.app" className="text-[#E9C176] hover:underline">
                privacy@finai.app
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              7. Data Retention
            </h2>
            <p>
              We retain your data for as long as your account is active. Upon account deletion, 
              we permanently delete your financial data within 30 days, except where required 
              by law (e.g., tax records for 7 years).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              8. Cookies and Tracking
            </h2>
            <p>
              We use essential cookies for authentication and session management. We do not use 
              third-party advertising cookies. You can disable non-essential cookies in your 
              browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              9. Children's Privacy
            </h2>
            <p>
              FinAI is not intended for users under 18. We do not knowingly collect data from 
              children. If you believe a minor has provided us with personal information, 
              please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of 
              significant changes via email or in-app notification. Continued use of FinAI 
              after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              11. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy or your data, contact us at:
            </p>
            <div className="mt-3 space-y-1">
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:privacy@finai.app" className="text-[#E9C176] hover:underline">
                  privacy@finai.app
                </a>
              </p>
              <p>
                <strong>Support:</strong>{' '}
                <a href="mailto:support@finai.app" className="text-[#E9C176] hover:underline">
                  support@finai.app
                </a>
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[#4E4639]/20 text-center">
          <Link href="/landing" className="text-[#C5A059] hover:underline">
            Return to FinAI
          </Link>
        </div>
      </div>
    </div>
  );
}
