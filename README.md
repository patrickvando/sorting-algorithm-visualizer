<h1>Sorting Algorithm Visualizer</h1>

This project is live at www.patrickvando.com/sort_visualizer

![Demo Screencap](/assets/screencap.png "Sort Algorithm Visualizer")

This project is meant to demonstrate three of the efficient sort algorithms: Heap sort, Merge sort, and Quick sort. 

<h2>How it works</h2>

1. 100 random values between 1 and 100 are initialized into a list.
2. When a sort algorithm is selected, the sort algorithm is run in the background, and at each step the state of the list is saved into a queue.
3. The "animation" occurs after the sort algorithm has finished, and works by popping "frames" off the queue.
4. When a different sort algorithm is selected, or when the list is reset, or when the list is randomized again, the queue is cleared, and steps 2-3 occur again.

This program uses the lux bootstrap theme.
https://bootswatch.com/lux/
