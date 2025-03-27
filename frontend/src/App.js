import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AddGrade from './pages/admin/AddGrade';
import ViewTimetable from './pages/admin/ViewTimetable';
import ViewGrade from './pages/admin/ViewGrade';
import AddBatch from './pages/admin/AddBatch';
import ViewBatch from './pages/admin/ViewBatch';
import AddTeacher from './pages/admin/AddTeacher';
import ViewTeacher from './pages/admin/ViewTeacher';
import AddVenue from './pages/admin/AddVenue';
import ViewVenue from './pages/admin/ViewVenue';
import AddCourse from './pages/admin/AddCourse';
import ViewCourse from './pages/admin/ViewCourse';
import ViewStudent from './pages/admin/ViewStudent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-grade" element={<AddGrade />} />
          <Route path="view-timetable" element={<ViewTimetable />} />
          <Route path="view-grade" element={<ViewGrade />} />
          <Route path="add-batch" element={<AddBatch />} />
          <Route path="view-batch" element={<ViewBatch />} />
          <Route path="add-teacher" element={<AddTeacher />} />
          <Route path="view-teacher" element={<ViewTeacher />} />
          <Route path="add-venue" element={<AddVenue />} />
          <Route path="view-venue" element={<ViewVenue />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="view-course" element={<ViewCourse />} />
          <Route path="view-student" element={<ViewStudent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;