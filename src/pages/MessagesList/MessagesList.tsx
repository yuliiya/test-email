import { FC, Fragment, useMemo } from 'react';
import { NavLink, Outlet, useLocation, useSearchParams } from 'react-router';
import { useMessages } from 'src/api/messages/queries.ts';
import { ListSkeleton } from 'src/components/ListSkeleton';
import { ListWrapper } from 'src/components/ListWrapper';
import { MessageEmptyState } from 'src/components/MessageEmptyState';
import { MessageListItem } from 'src/components/MessageListItem';
import { useListNavigation } from 'src/hooks/useListNavigation.ts';
import { groupedEmailsByDate } from 'src/utils/groupEmailsByDate.ts';

export const MessagesList: FC = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const messageId = searchParams.get('messageId');

  const labelId = pathname?.replace('/', '').toUpperCase();

  const { data = [], isLoading } = useMessages(labelId);

  const { navigateToItem, findItemIndex } = useListNavigation(data);

  const groupedEmails = useMemo(() => groupedEmailsByDate(data), [data]);

  if (!data.length && !isLoading) return <MessageEmptyState />;

  return (
    <div className="flex h-full justify-between">
      <ListWrapper>
        <>
          {isLoading ? (
            <ListSkeleton />
          ) : (
            <>
              {Array.from(groupedEmails).map(([group, emails]) => (
                <Fragment key={group}>
                  <h5 className="text-xs mb-2 pl-3 uppercase text-gray-500">{group}</h5>
                  <div className="space-y-4">
                    {emails.map(({ id, subject, date, from, content, isRead }) => (
                      <NavLink
                        to={{ search: `messageId=${id}` }}
                        key={id}
                        replace
                        onClick={() => navigateToItem(findItemIndex(id))}
                      >
                        <MessageListItem
                          date={date}
                          from={from}
                          isRead={isRead}
                          content={content}
                          subject={subject}
                          isActive={id === messageId}
                        />
                      </NavLink>
                    ))}
                  </div>
                </Fragment>
              ))}
            </>
          )}
        </>
      </ListWrapper>
      <Outlet />
    </div>
  );
};
