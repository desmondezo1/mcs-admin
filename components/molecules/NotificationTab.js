import React, { useState, useEffect } from "react";
import moleculeStyle from "../../styles/molecule.module.css";
import NotificationIcon from "../../images/icons/NotificationIcon";

const list = [
  {
    name: " Nuovo Ordine",
    id: 1,
    date: "07.02.2022",
  },
  {
    name: " Nuovo Ordine",
    id: 2,
    date: "07.02.2022",
  },
  {
    name: " Nuovo Ordine",
    id: 3,
    date: "07.02.2022",
  },
  {
    name: " Nuovo Ordine",
    id: 4,
    date: "07.02.2022",
  },
  {
    name: " Nuovo Ordine",
    id: 5,
    date: "07.02.2022",
  },
  {
    name: " Nuovo Ordine",
    id: 6,
    date: "07.02.2022",
  },
  {
    name: " Nuovo Ordine",
    id: 7,
    date: "07.02.2022",
  },
  {
    name: " Nuovo Ordine",
    id: 8,
    date: "07.02.2022",
  },
];

NotificationTab.defaultProps = {
  notifications: list,
};
function NotificationTab({ notifications }) {
  const [open, setOpen] = useState(false);
  const [notificationList, setNotificationList] = useState();

  useEffect(() => {
    setNotificationList(notifications);
  }, [notifications]);
  return (
    <div className={moleculeStyle.notification_container}>
      <button
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <NotificationIcon />
      </button>
      {open && (
        <div className={moleculeStyle.notification_list_container}>
          {notificationList.map(({ name, id, date }) => (
            <button
              className={moleculeStyle.notification_list}
              onClick={() =>
                setNotificationList((prev) =>
                  prev.filter((data) => data.id !== id)
                )
              }
              key={id}
            >
              <div>{name}</div>
              <div>{date}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationTab;
