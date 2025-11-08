from pathlib import Path

HTML_FOLDER = Path("static/html")
HTML_FOLDER.mkdir(parents=True, exist_ok=True)  # create folder if it doesn't exist

def save_file(folder: Path, filename: str, content: bytes) -> str:
    folder.mkdir(parents=True, exist_ok=True)

    # Sanitize filename
    safe_filename = "".join(c for c in filename if c.isalnum() or c in ("-", "_", "."))

    file_path = folder / safe_filename

    # Write bytes
    with open(file_path, "wb") as f:
        f.write(content)

    return str(file_path)

def save_assets(files: dict, save_path: Path) -> Path:
    save_path = Path(save_path)
    save_path.mkdir(parents=True, exist_ok=True)

    for relative_path, content in files.items():
        asset_path = save_path / relative_path
        asset_path.parent.mkdir(parents=True, exist_ok=True)  # ensure parent directories exist

        if isinstance(content, bytes):
            with open(asset_path, "wb") as f:
                f.write(content)
        else:  # assume string
            with open(asset_path, "w", encoding="utf-8") as f:
                f.write(content)

    return save_path

