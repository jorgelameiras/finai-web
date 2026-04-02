import React from 'react';
import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#E4E1E9] py-16 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/landing" className="text-[#C5A059] hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-headline font-light mb-4">Terms of Service</h1>
          <p className="text-[#D1C5B4] text-sm">
            Last Updated: March 26, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-[#D1C5B4] leading-relaxed">
          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using FinAI ("the Service"), you agree to be bound by these Terms 
              of Service ("Terms"). If you do not agree to these Terms, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              2. Description of Service
            </h2>
            <p>
              FinAI is an AI-powered financial management platform that connects to your bank 
              accounts (via Plaid) to provide:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>Transaction tracking and categorization</li>
              <li>AI-powered spending insights</li>
              <li>Customizable dashboards and analytics</li>
              <li>Integration with your own AI agent via OpenClaw</li>
            </ul>
            <p className="mt-3">
              <strong>Important:</strong> FinAI has <strong>read-only</strong> access to your 
              bank accounts. We cannot move, withdraw, or transfer your money.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              3. Eligibility
            </h2>
            <p>You must be:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>At least 18 years old</li>
              <li>Capable of entering into a legally binding contract</li>
              <li>Not prohibited from using the Service under applicable law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              4. Account Registration
            </h2>
            <p>To use FinAI, you must:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your password</li>
              <li>Notify us immediately of unauthorized access</li>
            </ul>
            <p className="mt-3">
              You are responsible for all activity under your account. Do not share your 
              login credentials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              5. Subscription Plans and Payments
            </h2>
            <h3 className="text-xl font-medium text-white mt-4 mb-2">5.1 Plans</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Free:</strong> Limited bank connections, basic AI categorization</li>
              <li><strong>Pro ($9/mo):</strong> Unlimited banks, OpenClaw integration, custom dashboards</li>
              <li><strong>Premium ($19/mo):</strong> All Pro features + multi-user vaults, priority support</li>
            </ul>

            <h3 className="text-xl font-medium text-white mt-4 mb-2">5.2 Billing</h3>
            <p>
              Subscriptions are billed monthly via Stripe. You will be charged on the same day 
              each month. Prices are in USD.
            </p>

            <h3 className="text-xl font-medium text-white mt-4 mb-2">5.3 Cancellation</h3>
            <p>
              You may cancel your subscription at any time. Access to Pro/Premium features 
              will continue until the end of your current billing period. No refunds for 
              partial months.
            </p>

            <h3 className="text-xl font-medium text-white mt-4 mb-2">5.4 Free Trial</h3>
            <p>
              We may offer a 14-day free trial for Pro/Premium plans. You will not be charged 
              until the trial ends. Cancel before the trial ends to avoid charges.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              6. Acceptable Use
            </h2>
            <p>You agree NOT to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>Use the Service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Reverse engineer, decompile, or extract source code</li>
              <li>Use automated tools (bots, scrapers) without permission</li>
              <li>Violate any laws or regulations</li>
              <li>Impersonate another person or entity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              7. Data and Privacy
            </h2>
            <p>
              Your use of FinAI is governed by our{' '}
              <Link href="/privacy" className="text-[#E9C176] hover:underline">
                Privacy Policy
              </Link>
              . By using the Service, you consent to our collection and use of your data 
              as described.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              8. Third-Party Services
            </h2>
            <p>FinAI integrates with third-party services:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li><strong>Plaid:</strong> For bank connections</li>
              <li><strong>Stripe:</strong> For payment processing</li>
              <li><strong>AI Providers:</strong> OpenAI, Anthropic, or your own OpenClaw instance</li>
            </ul>
            <p className="mt-3">
              We are not responsible for the actions, errors, or downtime of these third parties. 
              Their use is subject to their own terms and policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              9. Intellectual Property
            </h2>
            <p>
              All content, features, and functionality of FinAI (including text, graphics, 
              logos, code, and software) are owned by FinAI or its licensors and are protected 
              by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mt-3">
              You may not copy, modify, distribute, sell, or lease any part of the Service 
              without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              10. Disclaimers
            </h2>
            <p className="font-semibold text-white">
              FinAI is provided "as is" without warranties of any kind.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>We do not guarantee the accuracy, completeness, or timeliness of data</li>
              <li>We are not responsible for financial decisions you make based on our insights</li>
              <li>FinAI is not a substitute for professional financial advice</li>
              <li>We do not guarantee uninterrupted or error-free service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              11. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, FinAI and its affiliates shall not be 
              liable for any indirect, incidental, special, consequential, or punitive damages, 
              or any loss of profits or revenues, whether incurred directly or indirectly, or 
              any loss of data, use, goodwill, or other intangible losses.
            </p>
            <p className="mt-3">
              Our total liability for any claims arising out of or related to these Terms or 
              the Service shall not exceed the amount you paid us in the 12 months preceding 
              the claim (or $100 if you are on the Free plan).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              12. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold harmless FinAI, its officers, directors, employees, 
              and agents from any claims, damages, losses, or expenses (including legal fees) 
              arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any law or the rights of a third party</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              13. Termination
            </h2>
            <p>We may terminate or suspend your account immediately, without notice, if:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>You violate these Terms</li>
              <li>We are required to do so by law</li>
              <li>We discontinue the Service</li>
            </ul>
            <p className="mt-3">
              Upon termination, your right to use the Service ceases immediately. We may 
              delete your data in accordance with our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              14. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of 
              significant changes via email or in-app notification. Continued use of FinAI 
              after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              15. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of the State of [Your State], USA, 
              without regard to conflict of law principles. Any disputes shall be resolved 
              in the state or federal courts located in [Your County/State].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-light text-[#E9C176] mb-4">
              16. Contact Us
            </h2>
            <p>
              If you have questions about these Terms, contact us at:
            </p>
            <div className="mt-3 space-y-1">
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:legal@finai.app" className="text-[#E9C176] hover:underline">
                  legal@finai.app
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

          <section className="mt-12 pt-8 border-t border-[#4E4639]/20">
            <p className="text-sm text-[#78716C]">
              By clicking "I Agree" or using FinAI, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms of Service.
            </p>
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
