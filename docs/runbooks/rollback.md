# Rollback

Use this when a deploy has broken production.

Rollback follows section 14 of [DEPLOYMENT.md](../DEPLOYMENT.md#14-rollback-procedure).

In short:

1. Revert the bad change on `main` (`git revert <bad-commit-sha>`), open it as a pull request and merge once CI passes. The **Deploy** workflow redeploys the reverted state automatically.
2. If a Firestore rules change caused the problem, revert `firestore.rules` the same way; **Deploy Firestore rules** republishes them.
3. Confirm the app answers on `/healthz` and that staff can sign in.

Afterwards, record what happened and the fix in the pull request that resolves the root cause.
