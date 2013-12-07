using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FleetOpsCalendar.Models
{
    public class Comment
    {
        public string EventId { get; set; }
        public string Commenter { get; set; }
        public string CommentId { get; set; }
        public string CommentText { get; set; }
        public string CommentDate { get; set; }
    }
}