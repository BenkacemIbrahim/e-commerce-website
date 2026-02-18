# Contributing Guide

Thanks for contributing to AetherCart.

## Prerequisites
- Node.js 20+ recommended
- npm 10+
- MongoDB instance for backend development

## Local Setup
1. Install dependencies
```bash
cd backend && npm ci
cd ../frontend && npm ci
```
2. Configure backend environment
```bash
cd backend
cp .env.example .env
```
3. Start development servers
```bash
# terminal 1
cd backend && npm run dev

# terminal 2
cd frontend && npm run dev
```

## Development Workflow
1. Create a branch from `main`
2. Make focused changes
3. Run checks before opening a PR
```bash
cd backend && npm run typecheck && npm run build
cd ../frontend && npm run lint && npm run build
```
4. Open a pull request using the template

## Commit Style
- Use clear, scoped commit messages
- Example: `feat(api): add order status update validation`

## Pull Request Expectations
- Explain what changed and why
- Include screenshots for UI changes
- Mention any migration or env var changes
- Keep changes small and reviewable when possible
