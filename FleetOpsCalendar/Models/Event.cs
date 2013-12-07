using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FleetOpsCalendar.Models
{
    public class Event
    {
        public string eventId { get; set; }
        public string title { get; set; }
        public string start { get; set; }
        public string end { get; set; }
        public bool allDay { get; set; }
        public string className { get; set; }
    }
}