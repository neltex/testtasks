<?php

// tests/Feature/TasksControllerTest.php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TasksControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that unauthenticated users cannot access the tasks index.
     */
    public function test_tasks_index_requires_authentication()
    {
        $response = $this->getJson('/tasks');

        $response->assertStatus(401); // Unauthorized
    }

    /**
     * Test that authenticated users can retrieve their tasks.
     */
    public function test_authenticated_user_can_retrieve_tasks()
    {
        $user = User::factory()->create();

        // Acting as the authenticated user
        $response = $this->actingAs($user)->withHeaders(['Accept' => 'application/json'])->get('/tasks');

        $response->assertOk();
    }

    /**
     * Test that authenticated users can create a task.
     */
    public function test_authenticated_user_can_create_task()
    {
        $user = User::factory()->create();

        $taskData = [
            'title' => 'Test Task',
            'description' => 'This is a test task.',
            'due_date' => now()->addWeek()->toDateString(),
            'status' => 'pending',
        ];

        $response = $this->actingAs($user)->post('/tasks', $taskData);

        $response->assertSessionHasNoErrors();

        $user->refresh();

        $this->assertDatabaseHas('tasks', [
            'title' => 'Test Task',
            'user_id' => $user->id,
            'due_date' => now()->addWeek()->toDateString(),
        ]);
    }

    /**
     * Test that authenticated users can update their task.
     */
    public function test_authenticated_user_can_update_task()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id]);

        $updatedData = [
            'title' => 'Updated Task Title',
            'description' => 'Updated description.',
            'due_date' => now()->addDays(10)->toDateString(),
            'status' => 'completed',
        ];

        $response = $this->actingAs($user)->put("/tasks/{$task->id}", $updatedData);

        $response->assertSessionHasNoErrors();

        $user->refresh();

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => 'Updated Task Title',
            'description'=> 'Updated description.',
            'due_date' => now()->addDays(10)->toDateString(),
            'status' => 'completed',
        ]);
    }

    /**
     * Test that authenticated users can delete their task.
     */
    public function test_authenticated_user_can_delete_task()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->delete("/tasks/{$task->id}");

        $response->assertSessionHasNoErrors();

        $this->assertDatabaseMissing('tasks', [
            'id' => $task->id,
        ]);
    }

  
    /**
     * Test validation when creating a task.
     */
    public function test_task_creation_validation()
    {
        $user = User::factory()->create();


        // Missing required fields
        $response = $this->actingAs($user)->postJson('/tasks', [
            'title'=> '',
            'description' => '',
            'due_date' => 'invalid-date',
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['title', 'description', 'due_date']);
    }

    /**
     * Test validation when updating a task.
     */
    public function test_task_update_validation()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id]);

        // Invalid data
        $response = $this->actingAs($user)->putJson("/tasks/{$task->id}", [
            'title' => '',
            'due_date' => 'invalid-date',
            'status' => 'unknown',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['title', 'due_date', 'status']);
    }
}
