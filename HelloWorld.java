import Dog
public class Animal {
  protected int age;
  protected int weight;
  public Animal (int age, int weight) {
    this.age = age;
    this.weight = weight;
  }
  public int getAge () {
    return age;
  }
  public int getWeight () {
    return weight;
  }
  public void run () {
    System.out.println("dog is running.");
  }
}
public class Cat extends Animal {
  public Cat (int age, int weight) {
    super(age, weight);
  }
  public void voice () {
    System.out.println("the cat is miao~");
  }
}

public class HelloWorld {
  public static void main (String []args) {
    Dog dog = new Dog(2, 23.2);
    int age = dog.getAge();
    System.out.println(dog.getAge());
    dog.run();
  }
}