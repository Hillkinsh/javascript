function connect(root) {
  if (!root) return root
  root.left.next = root.right
  if (root.next) {
    root.right.next = root.next.left
  }
  root.left && connect(root.left)
  root.right && connect(root.right)
  return root
}