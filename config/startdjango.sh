#!/bin/sh

#Perms
uid=`stat -c '%u' /app`
gid=`stat -c '%g' /app`

if ! id "user${uid}" &>/dev/null; then
  echo "user${uid}:x:${uid}:${gid}:user${uid}:/user${uid}:/bin/ash" >> /etc/passwd
  echo "user${uid}:x:${gid}:" >> /etc/group
  mkdir -p "/user${uid}"
  chown "${uid}:${gid}" "/user${uid}"
fi

exec su "user${uid}" -c "sh /startdjango_user.sh"
