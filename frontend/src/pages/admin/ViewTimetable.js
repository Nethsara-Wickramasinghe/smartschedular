import React, { useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
  TableContainer,
  Chip,
  Tooltip,
  Button,
  Grid,
  Autocomplete,
  TextField,
  InputAdornment, // Added this import
} from '@mui/material';
import { Search as SearchIcon, PictureAsPdf as PdfIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid #e0e0e0',
  padding: theme.spacing(1),
  textAlign: 'center',
  '&:hover': {
    backgroundColor: '#e3f2fd',
    transition: 'background-color 0.3s',
  },
}));

const TimeCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: '#f5f5f5',
  border: '1px solid #e0e0e0',
  position: 'sticky',
  left: 0,
  zIndex: 1,
}));

const HeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: '#fff',
  fontWeight: 'bold',
  border: '1px solid #e0e0e0',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: theme.spacing(1, 4),
  textTransform: 'none',
  fontWeight: 'bold',
}));

const ViewTimetable = () => {
  // Simulated timetable data
  const initialTimetable = {
    Monday: [
      { time: '8:00 AM - 9:00 AM', teacher: 'Mr. John Smith', subject: 'Mathematics', venue: 'Room 101', grade: 'Grade 10', batch: 'Batch A', course: 'Math Basics' },
      { time: '10:00 AM - 11:00 AM', teacher: 'Ms. Emily Carter', subject: 'Physics', venue: 'Lab 1', grade: 'Grade 11', batch: 'Batch B', course: 'Physics Intro' },
      { time: '2:00 PM - 3:00 PM', teacher: 'Dr. Sarah Jones', subject: 'Biology', venue: 'Lab 2', grade: 'Grade 12', batch: 'Batch C', course: 'Biology Advanced' },
    ],
    Tuesday: [
      { time: '9:00 AM - 10:00 AM', teacher: 'Mr. David Lee', subject: 'Chemistry', venue: 'Lab 3', grade: 'Grade 10', batch: 'Batch A', course: 'Chem Basics' },
      { time: '11:00 AM - 12:00 PM', teacher: 'Ms. Anna Brown', subject: 'English', venue: 'Room 202', grade: 'Grade 11', batch: 'Batch B', course: 'English Lit' },
    ],
    Wednesday: [
      { time: '1:00 PM - 2:00 PM', teacher: 'Prof. Michael Green', subject: 'Computer Science', venue: 'IT Lab', grade: 'Grade 12', batch: 'Batch C', course: 'CS Fundamentals' },
      { time: '3:00 PM - 4:00 PM', teacher: 'Ms. Emily Carter', subject: 'Physics', venue: 'Lab 1', grade: 'Grade 11', batch: 'Batch B', course: 'Physics Intro' },
    ],
    Thursday: [
      { time: '10:00 AM - 11:00 AM', teacher: 'Dr. Sarah Jones', subject: 'Biology', venue: 'Lab 2', grade: 'Grade 12', batch: 'Batch C', course: 'Biology Advanced' },
      { time: '4:00 PM - 5:00 PM', teacher: 'Mr. John Smith', subject: 'Mathematics', venue: 'Room 101', grade: 'Grade 10', batch: 'Batch A', course: 'Math Basics' },
    ],
    Friday: [
      { time: '9:00 AM - 10:00 AM', teacher: 'Ms. Anna Brown', subject: 'English', venue: 'Room 202', grade: 'Grade 11', batch: 'Batch B', course: 'English Lit' },
      { time: '2:00 PM - 3:00 PM', teacher: 'Prof. Michael Green', subject: 'Computer Science', venue: 'IT Lab', grade: 'Grade 12', batch: 'Batch C', course: 'CS Fundamentals' },
    ],
    Saturday: [
      { time: '11:00 AM - 12:00 PM', teacher: 'Mr. David Lee', subject: 'Chemistry', venue: 'Lab 3', grade: 'Grade 10', batch: 'Batch A', course: 'Chem Basics' },
    ],
    Sunday: [],
  };

  const [timetable, setTimetable] = useState(initialTimetable);
  const [filters, setFilters] = useState({
    grade: null,
    batch: null,
    course: null,
    teacher: null,
  });

  // Simulated options (would come from backend)
  const grades = ['Grade 10', 'Grade 11', 'Grade 12'];
  const batches = ['Batch A', 'Batch B', 'Batch C'];
  const courses = ['Math Basics', 'Physics Intro', 'Biology Advanced', 'Chem Basics', 'English Lit', 'CS Fundamentals'];
  const teachers = ['Mr. John Smith', 'Ms. Emily Carter', 'Dr. Sarah Jones', 'Mr. David Lee', 'Ms. Anna Brown', 'Prof. Michael Green'];

  // Time slots (8 AM to 5 PM)
  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const startHour = i + 8;
    const endHour = startHour + 1;
    return `${startHour}:00 AM - ${endHour > 12 ? endHour - 12 : endHour}:00 ${endHour > 12 ? 'PM' : 'AM'}`;
  });

  // Handle filter changes
  const handleFilterChange = (name) => (event, newValue) => {
    setFilters({ ...filters, [name]: newValue });
  };

  // Apply filters when "Get Timetable" is clicked
  const handleGetTimetable = () => {
    const filtered = {};
    Object.keys(initialTimetable).forEach((day) => {
      filtered[day] = initialTimetable[day].filter((entry) => {
        return (
          (!filters.grade || entry.grade === filters.grade) &&
          (!filters.batch || entry.batch === filters.batch) &&
          (!filters.course || entry.course === filters.course) &&
          (!filters.teacher || entry.teacher === filters.teacher)
        );
      });
    });
    setTimetable(filtered);
  };

  // Generate and download PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Weekly Timetable', 14, 22);

    const tableData = timeSlots.map((time) => {
      const row = [time];
      ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach((day) => {
        const entry = timetable[day].find((e) => e.time === time);
        row.push(entry ? `${entry.teacher}\n${entry.subject}\n${entry.venue}\n${entry.grade} - ${entry.batch}` : '-');
      });
      return row;
    });

    autoTable(doc, {
      head: [['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']],
      body: tableData,
      startY: 30,
      styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' },
      headStyles: { fillColor: [25, 118, 210], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    doc.save('timetable.pdf');
  };

  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: '#1976d2', fontWeight: 'bold', mb: 4, textAlign: 'center' }}
      >
        View Timetable
      </Typography>

      <StyledPaper elevation={3}>
        {/* Filters */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 'bold' }}>
            Filter Timetable
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                options={grades}
                value={filters.grade}
                onChange={handleFilterChange('grade')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Grade"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
                  />
                )}
                noOptionsText="No grades found"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                options={batches}
                value={filters.batch}
                onChange={handleFilterChange('batch')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Batch"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
                  />
                )}
                noOptionsText="No batches found"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                options={courses}
                value={filters.course}
                onChange={handleFilterChange('course')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Course"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
                  />
                )}
                noOptionsText="No courses found"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                options={teachers}
                value={filters.teacher}
                onChange={handleFilterChange('teacher')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Teacher"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
                  />
                )}
                noOptionsText="No teachers found"
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <StyledButton
                variant="contained"
                color="primary"
                onClick={handleGetTimetable}
              >
                Get Timetable
              </StyledButton>
            </Grid>
          </Grid>
        </Box>

        {/* Timetable Table */}
        <TableContainer sx={{ maxHeight: 600, overflowX: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <HeaderCell>Time</HeaderCell>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <HeaderCell key={day}>{day}</HeaderCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {timeSlots.map((time) => (
                <TableRow key={time}>
                  <TimeCell>{time}</TimeCell>
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                    const entry = timetable[day].find((e) => e.time === time);
                    return (
                      <StyledTableCell key={`${day}-${time}`}>
                        {entry ? (
                          <Tooltip title={`${entry.subject} - ${entry.venue}`} arrow>
                            <Box>
                              <Typography variant="body2" fontWeight="bold">{entry.teacher}</Typography>
                              <Typography variant="caption">{entry.subject}</Typography>
                              <Chip label={entry.venue} size="small" sx={{ mt: 0.5, mr: 0.5 }} />
                              <Chip label={`${entry.grade} - ${entry.batch}`} size="small" sx={{ mt: 0.5 }} />
                            </Box>
                          </Tooltip>
                        ) : (
                          '-'
                        )}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* PDF Button Below Table */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <StyledButton
            variant="contained"
            color="primary"
            startIcon={<PdfIcon />}
            onClick={generatePDF}
          >
            Download PDF
          </StyledButton>
        </Box>
      </StyledPaper>
    </div>
  );
};

export default ViewTimetable;