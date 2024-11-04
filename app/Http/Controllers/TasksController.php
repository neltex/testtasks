<?php

namespace App\Http\Controllers;

use App\Models\Task; // Ensure the model is singular
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        return Inertia::render("Dashboard", [
            "task" => Task::where('user_id', Auth::id())->get(), // Fetch all tasks for the authenticated user
            "message" => session('message') // Pass any session messages if needed
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'required|date',
        ]);

        $task = new Task($validated);
        $task->user_id = Auth::id(); // Associate with the authenticated user
        $task->save();

        return redirect()->route('tasks.index')->with('success', 'Task created successfully.');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'required|date',
            'status' => 'required|in:pending,in_progress,completed',
        ]);
        $task->user_id = Auth::id(); // Associate with authorized user
        $task->update($validated);

        return redirect()->route('tasks.index')->with('success', 'Task updated successfully.');
    }

    public function destroy(Task $task)
    {
        // Ensure the task belongs to the authenticated user
        $task->user_id = Auth::id(); // Associate with authorized user
        $task->delete();

        return redirect()->route('tasks.index')->with('success', 'Task deleted successfully.');
    }
}
