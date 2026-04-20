from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class ModelTestCase(TestCase):
    def test_user_creation(self):
        user = User.objects.create(name='Test', email='test@example.com', team='marvel')
        self.assertEqual(user.name, 'Test')
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.team, 'marvel')

    def test_team_creation(self):
        team = Team.objects.create(name='marvel', members=['Test'])
        self.assertEqual(team.name, 'marvel')
        self.assertIn('Test', team.members)

    def test_activity_creation(self):
        activity = Activity.objects.create(user='Test', activity='Run', duration=30)
        self.assertEqual(activity.user, 'Test')
        self.assertEqual(activity.activity, 'Run')
        self.assertEqual(activity.duration, 30)

    def test_leaderboard_creation(self):
        lb = Leaderboard.objects.create(team='marvel', points=100)
        self.assertEqual(lb.team, 'marvel')
        self.assertEqual(lb.points, 100)

    def test_workout_creation(self):
        workout = Workout.objects.create(name='Pushups', suggested_for=['Test'])
        self.assertEqual(workout.name, 'Pushups')
        self.assertIn('Test', workout.suggested_for)
