import React from 'react'
import s from './PlayersTable.module.scss'
import { Room } from 'types/rooms'

type Props = {
  sessions: Room[]
}

export const PlayersTable: React.FC<Props> = ({ sessions }) => {
  if (sessions.length < 1) return <h4 className={s.error}>Онлайн пуст...</h4>

  return (
    <div className={s.wrapper}>
      <table className={s.table}>
        <tbody>
          <tr>
            <th>№ Комнаты</th>
            <th>Создатель</th>
            <th>Игроков</th>
            <th>Статус</th>
          </tr>
          {sessions.map((session) => {
            const roomAvailable = session.players.length === 2
            return (
              <tr key={session.roomId}>
                <td className={`${roomAvailable && s.table__untouchable}`}>
                  {session.roomId}
                </td>
                <td className={`${roomAvailable && s.table__untouchable}`}>
                  {session.players[0].name}
                </td>
                <td className={`${roomAvailable && s.table__untouchable}`}>
                  {session.players.length}
                </td>
                <td className={`${roomAvailable && s.table__untouchable}`}>
                  {roomAvailable ? ' Закрыта' : 'Открыта'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
