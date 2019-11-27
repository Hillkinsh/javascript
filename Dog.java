package javascript;
public class Dog {
  private int age;
  private float weight;
  public Dog(int age, float weight) {
    this.age = age;
    this.weight = weight;
  }
  public int getAge () {
    return age;
  }
  public float getWeight () {
    return weight;
  }
  public void run () {
    System.out.println("the dog is running");
  }
}