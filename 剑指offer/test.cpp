#include <iostream>
int Partition (int data[], int length, int start, int end) {
  if (data == nullptr || length <= 0 || start < 0 || end >= length) {
    throw new std::exception("invalid parameters");
  }
  int index = 
}