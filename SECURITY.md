# Security Policy

## Supported Versions
Security fixes are prioritized for the latest `main` branch.

## Reporting a Vulnerability
Please do not open public issues for security vulnerabilities.

Instead, contact the maintainers privately with:
- A clear description of the issue
- Reproduction steps or proof of concept
- Potential impact

We aim to acknowledge reports within 72 hours and provide a remediation plan after validation.

## Secrets and Sensitive Data
- Never commit real API keys, tokens, or production credentials
- Keep only `.env.example` files in source control
- Rotate credentials immediately if accidental exposure occurs
