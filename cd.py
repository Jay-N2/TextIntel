import gym
import numpy as np
import random

env = gym.make('CatsDrop-v0')

# Define a Q-learning agent
class QLearningAgent:
    def __init__(self, env):
        self.env = env
        self.state_space = env.observation_space.n
        self.action_space = env.action_space.n
        self.q_table = np.zeros((self.state_space, self.action_space))
        self.alpha = 0.1  # Learning rate
        self.gamma = 0.9  # Discount factor
        self.epsilon = 0.1  # Exploration rate

    def choose_action(self, state):
        # Explore with a small probability
        if random.random() < self.epsilon:
            return random.randrange(self.action_space)

        # Exploit with a high probability
        else:
            return np.argmax(self.q_table[state])

    def update_q_table(self, state, action, reward, next_state):
        max_q_next = np.max(self.q_table[next_state])
        self.q_table[state, action] += self.alpha * (reward + self.gamma * max_q_next - self.q_table[state, action])

# Train the agent
agent = QLearningAgent(env)
num_episodes = 10000  # Number of training episodes
for episode in range(num_episodes):
    done = False
    state = env.reset()
    total_reward = 0

    while not done:
        action = agent.choose_action(state)
        next_state, reward, done, _ = env.step(action)

        agent.update_q_table(state, action, reward, next_state)
        state = next_state
        total_reward += reward

    print(f"Episode: {episode + 1}, Reward: {total_reward}")

# Play the game using the trained agent
while True:
    state = env.reset()
    done = False

    while not done:
        action = agent.choose_action(state)
        next_state, reward, done, _ = env.step(action)

        env.render()
        state = next_state

    if done:
        print("Game over!")
        break
