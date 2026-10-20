#!/bin/sh
# Fetches the private knowledge repository before a production build (Coolify).
# Does nothing unless KNOWLEDGE_DEPLOY_KEY is set, so local builds use ../knowledge.
set -eu

if [ -z "${KNOWLEDGE_DEPLOY_KEY:-}" ]; then
	echo 'fetch-knowledge: KNOWLEDGE_DEPLOY_KEY not set, skipping fetch.'
	exit 0
fi

if [ -z "${KNOWLEDGE_REPOSITORY:-}" ]; then
	echo 'fetch-knowledge: KNOWLEDGE_DEPLOY_KEY is set but KNOWLEDGE_REPOSITORY is missing (SSH URL of the private knowledge repository).' >&2
	exit 1
fi

if [ -z "${KNOWLEDGE_PATH:-}" ]; then
	echo 'fetch-knowledge: KNOWLEDGE_DEPLOY_KEY is set but KNOWLEDGE_PATH is missing (clone destination, e.g. .knowledge).' >&2
	exit 1
fi

key_file=$(mktemp)
trap 'rm -f "$key_file"' EXIT
trap 'exit 1' INT TERM
chmod 600 "$key_file"

# Accept a key pasted with literal \n sequences as well as real newlines; end with a newline.
printf '%s\n' "$KNOWLEDGE_DEPLOY_KEY" | sed 's/\\n/\
/g' >"$key_file"

rm -rf "$KNOWLEDGE_PATH"
GIT_SSH_COMMAND="ssh -i $key_file -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new" \
	git clone --quiet --depth 1 "$KNOWLEDGE_REPOSITORY" "$KNOWLEDGE_PATH"
echo "fetch-knowledge: cloned the knowledge repository into $KNOWLEDGE_PATH."
