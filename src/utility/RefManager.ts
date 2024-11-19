type RefObject<T> = {
  current: T | null;
};

class RefManager<T> {
  private refs: RefObject<T>[] = [];

  public addNewRef(newRef: T) {
    this.refs.push({ current: newRef });
  }

  public removeOldRef(oldRef: T | null) {
    this.refs = this.refs.filter(({ current }) => current !== oldRef);
  }

  public getRef(): T | null {
    const reversePriority = [...this.refs].reverse();
    const activeRef = reversePriority.find((ref) => ref?.current !== null);
    return activeRef ? activeRef.current : null;
  }
}

export default RefManager;
