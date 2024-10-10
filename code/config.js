let Config = {}

if (window.location.hostname === 'localhost') {
  Config = {
    project_type: 'local',
    // project_id : 'vmttgffaipkoonepekbh',
    // project_key : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtdHRnZmZhaXBrb29uZXBla2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwMDE4MzQsImV4cCI6MjA0MjU3NzgzNH0.kjI-h0vTSU2-IAjcm8IkoIEMQTR1ynqeQ8qTpss9DlQ'

    project_id : 'kuadygaguntgomwcopqi',
    project_key : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1YWR5Z2FndW50Z29td2NvcHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwMTM1MDQsImV4cCI6MjA0MjU4OTUwNH0.8s3TaKbSw_NqfzQrlguc7qJL8vF7c9Rtuxx8cdiItCo'
  }
} else {
  Config = {
    project_type: 'else',
    project_id : 'vmttgffaipkoonepekbh',
    project_key : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtdHRnZmZhaXBrb29uZXBla2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwMDE4MzQsImV4cCI6MjA0MjU3NzgzNH0.kjI-h0vTSU2-IAjcm8IkoIEMQTR1ynqeQ8qTpss9DlQ'
  }
}

export default Config;

