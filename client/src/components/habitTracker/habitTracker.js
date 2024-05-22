import React, { useState } from 'react';
import './HabitTracker.css';

const HabitTracker = () => {
    const [habits, setHabits] = useState([
        { name: 'Exercise', completed: false },
        { name: 'Read a book', completed: false },
        { name: 'Drink water', completed: false }
    ]);

    const toggleHabit = (index) => {
        const newHabits = [...habits];
        newHabits[index].completed = !newHabits[index].completed;
        setHabits(newHabits);
    };

    return (
        <div className="habit-tracker">
            <h2>Habit Tracker</h2>
            <ul>
                {habits.map((habit, index) => (
                    <li key={index} className={habit.completed ? 'completed' : ''} onClick={() => toggleHabit(index)}>
                        {habit.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HabitTracker;