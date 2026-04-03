# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Intro line “(N banned)” now uses the same count as the Discarded (banned) list: only bans for names still in the active catalog, not orphaned ban entries from names that were removed from the list.

### Changed

- After **Like** or **Dislike**, the picker chooses another random name from the pool (it avoids immediately re-showing the name you just rated when other names are available).
