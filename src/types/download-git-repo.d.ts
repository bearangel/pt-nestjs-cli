declare module 'download-git-repo' {
  /**
   * Download a git repository to a local directory
   * @param repository The repository URL or path
   * @param destination The local directory path
   * @param options Options for the download
   * @param callback Callback function
   */
  function download(
    repository: string,
    destination: string,
    options?: {
      clone?: boolean;
      headers?: Record<string, string>;
    },
    callback?: (err: Error | null) => void
  ): void;

  export default download;
}